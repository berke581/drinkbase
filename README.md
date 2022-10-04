# [**DrinkBase**](https://drinkbase.herokuapp.com/)

DrinkBase is a Full-Stack web application created for browsing and sharing cocktail recipes.

[You can view a Live Demo clicking here](https://drinkbase.herokuapp.com/)

**NOTE:** Images might be broken because it is deployed to Heroku, and since the Heroku filesystem is [ephemeral](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem), any changes to the filesystem whilst the dyno is running only last until that dyno is shut down or restarted. (Dynos are also restarted at least once per day to help maintain the health of applications running on Heroku.) I didn't use a service like Amazon S3 to overcome the problem, since this is a demo application it wouldn't make sense to have a paid service for that. You can still use other features and post a recipe yourself!

---

## **Features**

- User Registration and Authentication
- Account Deletion
- Input Validation for Backend and Frontend
- Browse Posted Recipes and Filter By Name
- Add a Post to Favorites
- View Post Details
- Upload Images —with certain mime types and size limit— for Posts
- Image Cropping Tool for Cropping to Required Aspect Ratio in Frontend
- Toast Messages

## **Technologies**

- Express
- MongoDB
- TypeScript
- JavaScript
- jQuery
- Mongoose
- Pug
- Sass

## **TODO**

- Email Verification
- Add More Filters (drink type etc.)
- Dockerize the Application

---

### **Running the Development Server**

```bash
yarn start:dev
```

### **Running Development Server in UI Mode**

> Use this to manually test Pug templates and/or styling, browser will sync with the UI changes.

```bash
yarn start:ui
```

### **Building**

> Building the app for production:

```bash
yarn build
```

### **Running the Production Build**

> After you build the app, run it using the following command:

```bash
yarn start:prod
```
