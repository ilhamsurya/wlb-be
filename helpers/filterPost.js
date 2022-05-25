const { Sequelize } = require('sequelize');

function filterPost(arr, order) {
  const resOrder = [];
  console.log(arr);
  console.log(order);
  arr.forEach(availOption => {
    switch (availOption.toLowerCase()) {
      case 'date':
        resOrder.push(['createdAt', order.toLowerCase()]);
        break;
      case 'user':
        resOrder.push(['User', 'username', order.toLowerCase()]);
        break;
      case 'email':
        resOrder.push(['User', 'email', order.toLowerCase()]);
        break;
      case 'comments':
        const commentDesc = Sequelize.literal(
          '(SELECT COUNT(*) FROM "Comment" WHERE "PostId" = "Post".id)',
        );
        resOrder.push([commentDesc, order.toLowerCase()]);
        break;
      case 'likes':
        const likeDesc = Sequelize.literal(
          '(SELECT COUNT(*) FROM "Like" WHERE "PostId" = "Post".id)',
        );
        resOrder.push([likeDesc, order.toLowerCase()]);
        break;
      default:
        resOrder.push(['id', order.toLowerCase()]);
    }
  });
  return resOrder;
}

module.exports = filterPost;
