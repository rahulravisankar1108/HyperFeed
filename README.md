# Social Media Application Backend 
 
Build RESTful APIs for a social media application.

## Objective
Building a RESTful APIs for a social media application that can be used to create post and view posts of their friends.

## Features 
- User login SignUp
- User can fill up profile details, upload profile picture, update details
- User will have a feed where user can see posts of friends and post their own posts.
- List all the friends
- Accept/ decline Pending Friend Request

---
### Tech Stack 
> Node, Express, MongoDB, Heroku
 
### EndPoints 
Just write the url, expected incoming request body, request headers, response object etc.
Also write 1-2 lines explaining the function of the endpoint.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/173052b94d6dfb8894de?action=collection%2Fimport)

**Auth**
1. Sign Up

    > Auth/SignUp provides the user to sign up if they are a new user.

    - Expected Incoming Request Body,
        1. Email ,
        2. User Name,
        3. Password,
        4. Full Name,
        5. Phone Number.

        ```{
            "email" : "rahull@gmail.com",
            "userName" : "rahull",
            "fullName" : "rahull",
            "password" : "rahull",
            "confirmPassword" : "rahull",
            "phone" : "8248774588"
        }

    - Expected Response
        * status(200),
             ``` "User":  
               {   
                  "Bio": "",  
                  "Website": "",  
                  "Gender": "",  
                  "ProfilePicture": "",  
                  "Followers": [],  
                  "Following": [],  
                  "Request": [],  
                  "GivenRequest": [],  
                  "Post": [],  
                  "_id": "609cc13b88faac0015c32a6a",  
                  "Email": "ABC@gmail.com",  
                  "UserName": "ABC",  
                  "FullName": "ABC",  
                  "Password": "$2b$10$syP1bPbCTAgYTtX/1d/GwOq/iIg0cGNeR7z.eQAfqYS6NPHRnJRz6",  
                  "Phone": "77896541233",  
              },  
             "message": "New User Details Added!" 

        *  status(400),  
                "message": "Already Registered Message!"

2. Login

    > Auth/Login provides the existing user to log in to their account.

    - Expected Incoming Request Body,
        1. UserName
        2. Password

        ```{
            "email": "rahull@gmail.com",
            "password": "rahull"
        }
  
    - Expected Response,
        * status(200),
             ``` "User":  
             {
                  "Bio": "",
                  "Website": "",
                  "Gender": "",
                  "ProfilePicture": "",
                  "Followers": [],
                  "Following": [],
                  "Request": [],
                  "GivenRequest": [],
                  "Post": [],
                  "_id": "609cc13b88faac0015c32a6a",
                  "Email": "ABC@gmail.com",
                  "UserName": "ABC",
                  "FullName": "ABC",
                  "Password": "$2b$10$syP1bPbCTAgYTtX/1d/GwOq/iIg0cGNeR7z.eQAfqYS6NPHRnJRz6",
                  "Phone": "77896541233",
                },
        * status(400),  
            Appropriate Error Message 
          
**User**
1. Show User

    > /ShowUser/:UserID provides the users to show their  Profile details which has been stored

    - Expected Incoming Request Body,
        1. userId
     
    - Expected Response,
        The Object containing that userId.
        ```"User": {
                "Bio": "",
                "Website": "",
                "Gender": "",
                "ProfilePicture": "",
                "Followers": [],
                "Following": [],
                "Request": [],
                "GivenRequest": [],
                "Post": [],
                "_id": "609cc13b88faac0015c32a6a",
                "Email": "ABC@gmail.com",
                "UserName": "ABC",
                "FullName": "ABC",
                "Phone": "77896541233",
                },

2. Remove User

    > /RemoveUser/:UserID provides the user to Delete their account from the App.

    - Expected Incoming Request Body,
        1. userId
   
    - Expected Response,
        Message : "User Deleted Successfully",  
           res:true,

3. Update Profile Details

    > /User/UpdateProfile provides the user to update their profile Details which has been stored during earlier.

    - Expected Incoming Request Body,
        1. userId 

        They'll give the userId, 
        remaining will be found out from their account.
        All are optional , if they want it they can update and store
        2. "Email",  
        3. "UserName",  
        4. "FullName",  
        5. "Password",  
        6. "Phone",  
        7. "Bio" ,  
        8. "Website",  
        9. "Gender,  

        ```{
            "userId" : "609a463ce9a5c899587d7e7d",
            "email" : "rahulravisankarr@gmail.com",
            "userName" : "RahulRavisankar",
            "fullName" : "RahulRavisankar",
            "password" : "RahulRavisankar",
            "phone" : "8248774588",
            "bio" : "Live the life!",
            "website": "",
            "gender": "Male"
        }

    - Expected Response,
        ```Message : "User Deleted Successfully",  
           res:true,

4. Search User
    > /SearchUser provides the user 
   
    - Expected Request body,
        1. userName

        ```{
            "UserName" : "rahul",
        }
       
    - Expected Response,
       The record which contains userName as the request body.

5. Update Profile Photo

    > /UpdateProfilePhoto provides the user to update their profile photo

    - Expected Request body,
        1. userId,
        2. image
       
    - Expected Response,
        ```message : Profile Photo Updated,
           res : true

**Follower**
1. Remove

    >  /Followers/RemoveUser provides the user to remove the other user who follow the current user

    - Expected Request
        1. userId,
        2. followerId

        ```{
            "userId" : "609a4639e9a5c899587d7e7c",
            "followerId" : "609a4632e9a5c899587d7e7b"
        }

    - Expected Response
        Message : "Follower Removed"

2. Get

    > /Followers/ShowAll-User/:UserID provides the user to get the other user details who already follow the curernt user

    - Expected Request (params)
        1. userId

    - Expected Response
        Array of all followers who follow the current user.

3. Count
    
    > /Followers/CountAll-User/:UserID provides the user to count their followers

    - Expected Request (params)
        1. userId

    - Expected Response  
        FollowersCount

**Following**
1. Delete

    > /Following/RemoveUser provides the user to delete the current user who already follow the other User

    - Expected Request
        1. userId,
        2. FollowingID
    - Expected Response  
        Message : "Removed the target User"

        ```{
            "UuerId" : "609a4632e9a5c899587d7e7b",
            "followingId" : "609a4639e9a5c899587d7e7c"
        }

2. Accept
    
    > /Following/AddUser provides the user to accept the request given by other users

    - Expected Request
        1. userId
        2. RequestedUserID

        ```{
            "userId" : "609a463ce9a5c899587d7e7d",
            "requestedUserId" : "609a4632e9a5c899587d7e7b"
        }

    - Expected Response  
        Message : "Accepted the Target User to follow"

3. Count

    > /following/CountAll-User/:UserID provides the user to count whom the current user follows

    - Expected Request (params)
        1. CurrentUserID

    - Expected Response
        ```{
               "followingCount": 2
           }

4. Get 

    > /following/ShowAll-User/:UserID provides the user to get all the other users details whom the current user follows

    - Expected Request (params)
        1. userId

    - Expected Response
        ```{
          "followingList": [
              {
                  "Bio": "",
                  "Website": "",
                  "Gender": "",
                  "ProfilePicture": "",
                  "_id": "609a4639e9a5c899587d7e7c",
                  "Email": "ABC@gmail.com",
                  "UserName": "ABC",
                  "FullName": "ABC",
                  "Phone": "9857412633"
              },
            ]
        }

**Request**
1. Get
    
    > /request/ShowAll-Users/:UserID provides the user to get all the request received from other users to the Current User

    - Expected Request (params)
        1. userId
    - Expected Response
        ```"requestedUser": [
                {
                    "Bio": "",
                    "Website": "",
                    "Gender": "",
                    "ProfilePicture": "",
                    "_id": "609a4632e9a5c899587d7e7b",
                    "Email": "ABC@gmail.com",
                    "UserName": "ABC",
                    "FullName": "ABC",
                    "Phone": "7894561233"
                }
            ],
        "res": true 

2. Remove
    
    > /request/RemoveUser provides the user to remove one request given by the other user

    - Expected Request
        1. userId
        2. requestId

        ```{
            "userId" : "609a4632e9a5c899587d7e7b",
            "requestId": "609a4639e9a5c899587d7e7c"
        }
        
    - Expected Response
        Message : "User removed from request"

3. To Give Request
    
    > /request/Initiate provides the suer to give request to other request

    - Expected Request
        1. targetID
        2. userId

        ```{
            "targetId" : "609a463ce9a5c899587d7e7d",
            "userId" : "609a4632e9a5c899587d7e7b"
        }
        
    - Expected Response
        Message : "Requested"

4. Count
    
    > /request/CountAll-Users/:UserID provides the user to count the number of request given by other users

    - Expected Request (params)
        1. userId
     
    - Expected Response
        "RequestedCount"

5. Clear
    
    > Request/ClearAll-Users/:UserID provides the user to clear all the request given by the other users

    - Expected Request (params)
        1. userId
        
    - Expected Response
        message : "Removed all requests"

**Given Request**
1. Remove
    
    > /Requested/RemoveUser provides the user to remove the Request given by the current User to other user

    - Expected Request
        1. CurrentUserID
        2. userId of the given Request

        ```{
            "userId" : "609a463ce9a5c899587d7e7d",
            "givenRequestUser" : "609a4639e9a5c899587d7e7c"
        }
        
    - Expected Response
        Message : "Given request Removed"

2. Get 
    
    > /requested/ShowAll-Users/:UserID  provides the user to get the details of the userId's which current User has given friend request.

    - Expected Request (params)
        1. userId
        
    - Expected Response
        ```if Given Request in current User 
        exists status(200),
            Array containing the Details of the Given Friend Request's friends.,
            res:true
        else status(400),
            res:"false"

3. Count
    
    > /GivenRequest/Count/:UserID provides the user to count the number of Request given by the currentUser

    - Expected Request (Params)
        1. userId

    - Expected Response
        'GivenRequestCount'

**Post**
1. Remove One
    
    > /RemoveMyPost provides user to Delete the selected post of them.

    - Expected Request
        1. userId,
        2. PostID,

        ```{
            "userId": "609a4632e9a5c899587d7e7b",
            "Id": "609b8a6d6bf5a094bcaaedba"
        }

    - Expected Response,
        Message : "Post Deleted"
        res: true

2. Remove All
    
    > /RemoveAll-MyPost provides the user to delete all their posts.

    - Expected Request (Params)
        1. userId 
        
    - Expected Response
        Message : "All post Removed"

3. Get friends Post
    
    > /GetFriendsPost provides the user to get all their following's posts.

    - Expected Request (Params)
        1. userId
        
    - Expected Response 
        ```{
            "FriendPost": [
            {
                "image": "some url",
                "caption": "Good day",
                "location": "Coimbatore",
                "_id": "609bd4ce82bea482d0970bb8",
                "__v": 0
            }
        }

4. Add Post
    
    > /StoreMyPost provides the user to add new post.

    - Expected Request
        1. userId
        2. Caption
        3. Location
        4. image

        ```{
            "userId" : "609a463ce9a5c899587d7e7d",
            "caption" : "be free",
            "location : "cbe",
            "image" : "someUrl",
        }
       
    - Expected Reponse
        Message : "Post Added Sucessfully",  
           res:true 

5. Get My Post
    
    > /MyPosts provides user to get their posted photos

    - Expected Request (Params)
        1. userId
        
    - Expected Response
        ```{
            "res": false // if no post,

            "res" : true,
            "GetPostDetails": [Post Details],
        } 

6. Update Post Details
    
    > /UpdateMyPostDetails provides user to edit their posted photo's details

    - Expected Request
        1. PostId
        2. Caption
        3. Location

        ```{
            "Id" : "609b8a6d6bf5a094bcaaedba",
            "caption" : "Be free",
            "location" : "Coimbatore",
        }
        
    - Expected Response
       Message : "Post Details Updated",
        res : true
