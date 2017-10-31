function createUser(req, res){
    var user = new User;
    user.age = req.body.age;
    user.name = req.body.name;
    user.email = req.body.email;
    user.userName = req.body.login;
    var password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){
        if (err){
            res.sendStatus(500);
        }
        else {
            user.password = hash;
            user.save(function (err) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200);
                }
            });
        }
    });
}