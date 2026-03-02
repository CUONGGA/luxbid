module.exports = {

  inc: function(value) {
    return value + 1;
  },

  eq: function(a, b) {
    return a === b;
  },

  includes: function(array, value) {
    if (!array) return false;
    return array.includes(value.toString());
  },

  sortable: (field, sort) => {

    const sortType = field === sort.column ? sort.type : 'default';

    const icons = {
      default: 'bi bi-filter',
      asc: 'bi bi-sort-down',
      desc: 'bi bi-sort-up'
    };

    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc'
    };

    const icon = icons[sortType];
    const type = types[sortType];

    return `
      <a href="?_sort&column=${field}&type=${type}">
        <i class="${icon}"></i>
      </a>
    `;
  }

};