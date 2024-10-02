

const { ForbiddenError } = require("../errors");

module.exports = (loggedinUser, modelUserId) => {

      // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (loggedinUser.role === 'admin') return;
  if (loggedinUser._id.toString() === modelUserId.toString()) return;
  throw new ForbiddenError(
    'Not authorized to access this route'
  );


}