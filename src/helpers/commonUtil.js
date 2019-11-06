/*
    Module for writing common helper functions across the app
*/

function compareAndSortDates(a, b) {
    if (new Date(a.delivery_date) < new Date(b.delivery_date)) {
      return -1;
    }
    if (new Date(a.delivery_date) > new Date(b.delivery_date)) {
        return 1;
       }
    return 0;
  }

// eslint-disable-next-line import/prefer-default-export
export { compareAndSortDates };
