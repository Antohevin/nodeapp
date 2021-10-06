
const express = require('express');

const app = express();

var mongoose = require('mongoose');

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));



mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) throw err;
    else console.log('Conected to database successfully...!');
});

app.listen(8080, () => console.log(`Connected to ${"localhost"}:${8080}`));

var multiparty = require('multiparty');
var User = require('./src/model/user');
var Log = require('./src/model/logs');


app.get('/users', (req, res) => {
    User.find({})
        .then(users => {
            return res.status(200).json({
                message: 'successfully found',
                users: users
            });
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });
});


app.post('/users', (req, res) => {
    var newUser = new User();
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.age = req.body.age;
    newUser.createdby = "Anto Hevin";
    newUser.createdat = Date.now();
    newUser.modifiedby = "Anto Hevin";
    newUser.modifiedat = Date.now();
    newUser.statusflag = "A";
    newUser.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});



app.post('/sendemail',(req,res) => {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {


        var transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com', // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
              ciphers: 'SSLv3',
            },
            auth: {
              'user': '',
              'pass': '',
            },
          });
        
          files.forEach(function (file) {
        
            var mail = {
              from: '',
              to: file.email,
              subject: options.subject,
              text: file.content,
            };
            transporter.sendMail(mail, (err) => {
                if (err){


                    // Add to parking-lot-queue


                    return res.status(500).send({ success: false, message: 'invalid request', e: err });
                }

                var newLog = new Log();
                    newLog.date = Date.now();
                    newLog.email = file.email;
                    newLog.newslettername = file.newslettername;
                    newLog.createdby = "Anto Hevin";
                    newLog.createdat = Date.now();
                    newLog.modifiedby = "Anto Hevin";
                    newLog.modifiedat = Date.now();
                    newLog.statusflag = "A";
                    newLog.save()
                    .then(item => {
                        logger("Log saved to database");
                    })
                    .catch(err => {
                        logger("unable to save to database");
                    });

                return res.status(200).send({ success: true, data: 'email sent successfully.' });


                
                });
          });
    });
});









