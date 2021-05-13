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

**Auth**
1. Sign Up
    **URL** - https://social-media-app-back.herokuapp.com/Auth/SignUp

    > Auth/SignUp provides the user to sign up if they are a new user.

    - Expected Incoming Request Body,
        1. Email ,
        2. User Name,
        3. Password,
        4. Full Name,
        5. Phone Number.

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
    **URL** - https://social-media-app-back.herokuapp.com/Auth/Login

    > Auth/Login provides the existing user to log in to their account.

    - Expected Incoming Request Body,
        1. UserName
        2. Password
  
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
    **URL** - https://social-media-app-back.herokuapp.com/ShowUser/:UserID

    > /ShowUser/:UserID provides the users to show their  Profile details which has been stored

    - Expected Incoming Request Body,
        1. UserID
     
    - Expected Response,
        The Object containing that UserID.
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
    **URL** - https://social-media-app-back.herokuapp.com/RemoveUser/:UserID

    > /RemoveUser/:UserID provides the user to Delete their account from the App.

    - Expected Incoming Request Body,
        1. UserID
   
    - Expected Response,
        Message : "User Deleted Successfully",  
           res:true,

3. Update Profile Details
    **URL** - https://social-media-app-back.herokuapp.com/User/UpdateProfile

    > /User/UpdateProfile provides the user to update their profile Details which has been stored during earlier.

    - Expected Incoming Request Body,
        1. UserID 

        They'll give the UserID, 
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

    - Expected Response,
        ```Message : "User Deleted Successfully",  
           res:true,

4. Search User
    **URL** - https://social-media-app-back.herokuapp.com/SearchUser

    > /SearchUser provides the user 
   
    - Expected Request body,
        1. UserName
       
    - Expected Response,
       The record which contains userName as the request body.

5. Update Profile Photo
    **URL** - https://social-media-app-back.herokuapp.com/UpdateProfilePhoto

    > /UpdateProfilePhoto provides the user to update their profile photo

    - Expected Request body,
        1. UserID,
        2. Image
       
    - Expected Response,
        ```message : Profile Photo Updated,
           res : true

**Follower**
1. Remove
    **URL** - https://social-media-app-back.herokuapp.com/Followers/RemoveUser

    >  /Followers/RemoveUser provides the user to remove the other user who follow the current user

    - Expected Request
        1. UserID,
        2. FollowerID

    - Expected Response
        Message : "Follower Removed"

2. Get
    **URL** - https://social-media-app-back.herokuapp.com/Followers/ShowAll-User/:UserID

    > /Followers/ShowAll-User/:UserID provides the user to get the other user details who already follow the curernt user

    - Expected Request (params)
        1. UserID

    - Expected Response
        Array of all followers who follow the current user.

3. Count
    **URL** - https://social-media-app-back.herokuapp.com/Followers/CountAll-User/:UserID

    > /Followers/CountAll-User/:UserID provides the user to count their followers

    - Expected Request (params)
        1. UserID

    - Expected Response  
        FollowersCount

**Following**
1. Delete
    **URL** - https://social-media-app-back.herokuapp.com/Following/RemoveUser

    > /Following/RemoveUser provides the user to delete the current user who already follow the other User

    - Expected Request
        1. UserID,
        2. FollowingID
    - Expected Response  
        Message : "Removed the target User"

2. Accept
    **URL** - https://social-media-app-back.herokuapp.com/Following/AddUser

    > /Following/AddUser provides the user to accept the request given by other users

    - Expected Request
        1. UserID
        2. RequestedUserID

    - Expected Response  
        Message : "Accepted the Target User to follow"

3. Count
    **URL** - https://social-media-app-back.herokuapp.com/Following/CountAll-User/:UserID

    > /Following/CountAll-User/:UserID provides the user to count whom the current user follows

    - Expected Request (params)
        1. CurrentUserID

    - Expected Response
        ```{
               "FollowingCount": 2
           }

4. Get 
    **URL** -  https://social-media-app-back.herokuapp.com/Following/ShowAll-User/:UserID

    > /Following/ShowAll-User/:UserID provides the user to get all the other users details whom the current user follows

    - Expected Request (params)
        1. UserID

    - Expected Response
        ```{
          "FollowingList": [
              {
                  "Bio": "",
                  "Website": "",
                  "Gender": "",
                  "ProfilePicture": "",
                  "_id": "609a4639e9a5c899587d7e7c",
                  "Email": "Lalitha@gmail.com",
                  "UserName": "Lalitha",
                  "FullName": "Lalitha",
                  "Phone": "9787367249"
              },
            ]
        }

**Request**
1. Get
    **URL** - https://social-media-app-back.herokuapp.com/Request/ShowAll-Users/:UserID

    > /Request/ShowAll-Users/:UserID provides the user to get all the Request received from other users to the Current User

    - Expected Request
        1. UserID
    - Expected Response
        ```"RequestedUser": [
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
    **URL** - https://social-media-app-back.herokuapp.com/Request/RemoveUser

    > /Request/RemoveUser provides the user to remove one request given by the other user

    - Expected Request
        1. UserID
        2. RequestID
        
    - Expected Response
        Message : "User removed from request"

3. To Give Request
    **URL** - https://social-media-app-back.herokuapp.com/Request/Initiate

    > /Request/Initiate provides the suer to give request to other request

    - Expected Request
        1. targetID
        2. UserID
        
    - Expected Response
        Message : "Requested"

4. Count
    **URL** - https://social-media-app-back.herokuapp.com/Request/CountAll-Users/:UserID

    > /Request/CountAll-Users/:UserID provides the user to count the number of request given by other users

    - Expected Request (params)
        1. UserID
     
    - Expected Response
        "RequestedCount"

5. Clear
    **URL** - https://social-media-app-back.herokuapp.com/Request/ClearAll-Users/:UserID

    > Request/ClearAll-Users/:UserID provides the user to clear all the request given by the other users

    - Expected Request (params)
        1. UserID
        
    - Expected Response
        message : "Removed all requests"

**Given Request**
1. Remove
    **URL** - https://social-media-app-back.herokuapp.com/Requested/RemoveUser

    > /Requested/RemoveUser provides the user to remove the Request given by the current User to other user

    - Expected Request
        1. CurrentUserID
        2. UserID of the given Request
        
    - Expected Response
        Message : "Given Request Removed"

2. Get 
    **URL** - https://social-media-app-back.herokuapp.com/Requested/ShowAll-Users/:UserID

    > /Requested/ShowAll-Users/:UserID  provides the user to get the details of the UserID's which current User has given friend request.

    - Expected Request (params)
        1. UserID
        
    - Expected Response
        ```if Given Request in current User 
        exists status(200),
            Array containing the Details of the Given Friend Request's friends.,
            res:true
        else status(400),
            res:"false"

3. Count
    **URL** - https://social-media-app-back.herokuapp.com/GivenRequest/Count/:UserID

    > /GivenRequest/Count/:UserID provides the user to count the number of Request given by the currentUser

    - Expected Request (Params)
        1. UserID

    - Expected Response
        'GivenRequestCount'

**Post**
1. Remove One
    **URL** - https://social-media-app-back.herokuapp.com/RemoveMyPost
    
    > /RemoveMyPost provides user to Delete the selected post of them.

    - Expected Request
        1. UserID,
        2. PostID,

    - Expected Response,
        Message : "Post Deleted"
        res: true

2. Remove All
    **URL** - https://social-media-app-back.herokuapp.com/RemoveAll-MyPost/:UserID

    > /RemoveAll-MyPost provides the user to delete all their posts.

    - Expected Request (Params)
        1. UserID 
        
    - Expected Response
        Message : "All post Removed"

3. Get friends Post
    **URL** - https://social-media-app-back.herokuapp.com/GetFriendsPost/:UserID

    > /GetFriendsPost provides the user to get all their following's posts.

    - Expected Request (Params)
        1. UserID
        
    - Expected Response 
        ```{
            "FriendPost": [
            {
                "Image": "https://res.cloudinary.com/socialmediaa/image/upload/v1620825295/xfb7szj4s7uayjf7yhiv.jpg",
                "Caption": "Good day",
                "Location": "Coimbatore",
                "_id": "609bd4ce82bea482d0970bb8",
                "__v": 0
            }
        }

4. Add Post
    **URL** - https://social-media-app-back.herokuapp.com/StoreMyPost

    > /StoreMyPost provides the user to add new post.

    - Expected Request
        1. UserID
        2. Caption
        3. Location
        4. image
       
    - Expected Reponse
        Message : "Post Added Sucessfully",  
           res:true

5. Get My Post
    **URL** - https://social-media-app-back.herokuapp.com/MyPosts/:UserID

    > /MyPosts provides user to get their posted photos

    - Expected Request (Params)
        1. UserID
        
    - Expected Response
        ```{
            "res": false // if no post,

            "res" : true,
            "GetPostDetails": [Post Details],
        } 

6. Update Post Details
    **URL** - https://social-media-app-back.herokuapp.com/UpdateMyPostDetails

    > /UpdateMyPostDetails provides user to edit their posted photo's details

    - Expected Request
        1. PostId
        2. Caption
        3. Location
        
    - Expected Response
       Message : "Post Details Updated",
        res : true
