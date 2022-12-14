import React, { useState, useEffect } from 'react';
import Card from '../card/card';
import QuickReads from '../quickReads/quickReads';
import './library.css';

const API_URL = 'https://www.blackbullion.com/api/_dev/pathways';
const SORT_FILTER = {
  OLDEST_FIRST: 'Sort by oldest first',
  NEWEST_FIRST: 'Sort by newest first',
};

const Library = () => {
  const [items, setItems] = useState([]);
  const [initialItems, setInitialItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortFilter, setSortFilter] = useState(SORT_FILTER.OLDEST_FIRST);
  const [quickReadsEnabled, setQuickReadsEnabled] = useState(false);
  const [active, setActive] = useState('');

  const fetchData = async () => {
    await fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setInitialItems(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortItems = (array) => {
    if (sortFilter === SORT_FILTER.NEWEST_FIRST) {
      if (array[0].id > array[1].id) {
        return array.reverse();
      }
    } else {
      if (array[0].id < array[1].id) {
        return array.reverse();
      }
    }
  };

  const handleSort = (e) => {
    if (e === SORT_FILTER.NEWEST_FIRST) {
      setSortFilter(SORT_FILTER.NEWEST_FIRST);
    } else {
      setSortFilter(SORT_FILTER.OLDEST_FIRST);
    }

    sortItems(items);
  };

  const handleQuickReads = () => {
    let newItems;
    if (quickReadsEnabled) {
      newItems = initialItems;
      setQuickReadsEnabled(false);
      setActive('');
    } else {
      newItems = items.filter((item) => {
        let duration = item.duration.match(/\d+/g);
        return parseInt(duration) <= 10;
      });

      setQuickReadsEnabled(true);
      setActive('active');
    }
    setItems(newItems);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!error && !isLoading && (
        <div>
          <div className='library-filters'>
            <select
              data-testid='sort-filter'
              aria-label='Sort by newest first or oldest first'
              name='sort-filter'
              id='sort-filter'
              onChange={(e) => handleSort(e.target.value)}
              className='filter'
              value={sortFilter}
            >
              <option name='oldest-first' value={SORT_FILTER.OLDEST_FIRST}>
                {SORT_FILTER.OLDEST_FIRST}
              </option>
              <option name='newest-first' value={SORT_FILTER.NEWEST_FIRST}>
                {SORT_FILTER.NEWEST_FIRST}
              </option>
            </select>
            <button
              title='Pathways 10 mins and under'
              data-testid='quick-reads-filter'
              name='quick-reads-filter'
              id='quick-reads-filter'
              onClick={() => handleQuickReads()}
              className={`filter quick-reads ${active}`}
            >
              Show quick reads
              <QuickReads quickReadsEnabled={quickReadsEnabled} />
            </button>
          </div>
          <ul id='list' className='library-container'>
            {items &&
              items.map((item) => {
                return (
                  <li key={item.id}>
                    <Card item={item}></Card>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Library;
