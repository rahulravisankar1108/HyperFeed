const mongoose = require('mongoose');
const assert = require('assert');
require('dotenv/config');
const {SignUp, Login} = require('../routes/Auth');
const { mongoURI } = process.env.DATABASE_CONNECTION;

mongoose
    .connect(mongoURI,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log('Mongo Connection Error : ',err);
    });
const next = (error) => {
    console.log('Error in next : ',error);
};

const next = (error) => {
    // no next
};

describe("Unit Tests : Test for Routes/Auth.js:", ()=> {
    let req,res;
    beforeEach("It should Sign Up with new data", ()=> {
        req = {
            body : {
                FullName : `${uuidv4()}`,
                UserName : `${uuidv4()}`,
                Email : `${uuidv4()}@gmail.com`,
                Password : 'Test@123',
                Phone : '7894561236',
            },
        };

        res = {
            statusCode : 0,
            body : {},
            status:(code) => {
                res.statusCode = code;
                return res;
            },
            json : (response) => {
                res.body = response;
                return res;
            },
        };
    });

    it('should signup a random user' , function(done) {
        SignUp(req,res,next)
        .then(() => {
            assert.ok(res.statusCode===200);
            assert.ok(
                res.body.UserName.length>0 && res.body.length>0
            );
            done();
        })
        .catch((err) => {
            done(new Error(`Couldn't signUp a random User`));
        });
    });
    test('should signup a unique user', function(done) {
        Login(baseReq,res)
        .then(function() {
            assert.ok(res.statusCode==200);
            done();
        })
        .catch(err => {
            done(new Error(`Couldn't login the common test user`));
        });
    });
});