var User = require('./models/user').User;

var user = {
    userName: 'Tester3',
    email: 'wt@rds.w',
    password: 'qweqwe',
    name: "Tom"
};

// User.create(user, function (err) {
//     if (err) throw err;
// });

User.find(function (err, tester) {
    console.log(tester);
});