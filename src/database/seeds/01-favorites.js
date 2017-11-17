const dataRows = [{
  userId: '1',
  numOfFavorites: '10',
},
{
  userId: '2',
  numOfFavorites: '50',
}];

exports.seed = function(knex, Promise) {
  return knex('favorites')
    .del()
    .then(() => {
      return knex('favorites')
        .insert(dataRows);
    });
}
