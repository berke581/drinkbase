# **DrinkBase**

DrinkBase is a Full-Stack web application created for browsing and sharing cocktail recipes.

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
- JQuery
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
