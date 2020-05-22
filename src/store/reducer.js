import * as ACTIONS from '../common/constants';


export const initialState = {

    usernames: "user20",
    userId : "5ec4e28e793c6c236c26ee48",
    userIs:"guest",
    rateUserDeatils : "",
    
    user: {
        cart: [],
        cartTotal:0
    },
    products : [],
    item:{
        currentSelectedItem : {} ,
        itemRatingDetails:{
            countRatings : {} ,
            avgRating : 0,
            ratingCount : {},
            ratingList : {},
            
        },
        checkItemIsInWishList : ''

    },
    auth: {
        isAuthenticated: false,
        isTokenChecked: false,
        wishList : {},
        wishListCount : 0,
        wishListTotal : 0,
        role : "guest",
        user : {},
        userId : "",
        email : "",
        },
        items: [],

    menCategories: ['Jeans', 'Shirts', 'T-Shirts', 'Footwear'],
    womenCategories: ['Jeans', 'Blouses', 'Life Style', 'Footwear'],
    kidsCategories: ['Jeans', 'Shirts', 'T-Shirts', 'Footwear'],
    sportsCategories: ['Jeans', 'Shirts', 'T-Shirts', 'Footwear'],
    discountCategories: ['Jeans', 'Shirts', 'Footwear'],
    selectedMainCategory: "All",
    selectedSubCategory: "All",
    selectedItemsArray: [],
    itemInCartCount: 0,
    cartTotal:0.0,
    cartCheck: false,
    cart: [/*{
        itemID: 1,
        itemRatingDetails: {},
        images: ['http://localhost:4000/1.jpeg'],
        name: "Crocodile Shirt",
        price: 500.00,
        size: "XL",
        description: "50% OFF TODAY",
        mainCategory: "Men",
        subCategory: "Jeans",
        quantityInCart: 0,

    }*/]

};

const reducer = (state = initialState, {type, payload}) => {

    const newState = {...state};


    if (type === 'SIGNUP') {
        newState.auth.currentUser = payload.user;
    }  if (type === 'UPDATE_MAIN_CATEGORY') {
        newState.selectedMainCategory = payload;
    }  if (type === 'UPDATE_SUB_CATEGORY') {
        newState.selectedSubCategory = payload;
    }  if (type === 'UPDATE_SELECTED_ITEMS_ARRAY') {
        newState.selectedItemsArray = payload;
    }  if (type === 'UPDATE_CART') {
        newState.cart.push(payload)
    }  if (type === 'UPDATE_CART_COUNT') {
        newState.itemInCartCount++;
    }  if (type === 'UP_COUNT_IN_CART') {


        let index = state.cart.findIndex(x=> x.itemID===payload);
        newState.cart[index].quantityInCart =   newState.cart[index].quantityInCart+1;
        newState.cartTotal = newState.cartTotal + newState.cart[index].price;

    }if (type === 'DOWN_COUNT_IN_CART') {

        let index = state.cart.findIndex(x=> x.itemID===payload);
        newState.cart[index].quantityInCart =   newState.cart[index].quantityInCart-1;
        newState.cartTotal = newState.cartTotal - newState.cart[index].price;

    } if(type === 'ADD_TO_TOTAL'){
        newState.cartTotal = newState.cartTotal+payload.price;
    }if(type === 'CART_CHECK_TRUE'){
            //console.log('CART_CHECK_TRUE')
            newState.cartCheck = !newState.cartCheck;
    } if(type === 'CART_CHECK_FALSE'){
        console.log('CART_CHECK_F')
        newState.cartCheck = false;
    }if(type === 'CHECK_CART'){
        let index = newState.items.findIndex(x=> x.itemID===payload.itemID);
        newState.items[index].cartIn=true;

    }
    if(type === ACTIONS.GET_RATE_COMMENTS_SUCCESS){

        // console.log(payload.data);
     
         newState.item.itemRatingDetails.countRatings = payload.data.countRatings;
         
         newState.item.itemRatingDetails.avgRating = payload.data.avg;
     
         newState.item.itemRatingDetails.ratingCount = payload.data.noOfRatings;
     
         newState.item.itemRatingDetails.ratingList = payload.data.ratings
     
     }
     
     if(type === ACTIONS.GET_VIEW_ITEM_SUCCESS){
     
         newState.item.currentSelectedItem = payload.data;
     
     
     
     }
     
     if(type === ACTIONS.GET_USER_WISHLIST_SUCCESS){
     
         console.log('reducer user wishlist',payload);
        newState.auth.wishList = payload.wishlist;

         const count = payload.wishlist.length;

        console.log('count',count); // wishListCount
         
        newState.auth.wishListCount = count;

        //wishListTotal
        newState.auth.wishListTotal = payload.total;



     }
     // GET_ALL_PRODUCTS_SUCCESS
     if(type === ACTIONS.GET_ALL_PRODUCTS_SUCCESS){

        newState.items = payload;

        // const count = payload.data.length;

        // console.log('count',count); // wishListCount
        
        // newState.auth.wishListCount = count;
    }
    
 if(type === "CHECK_USER_RATED_SUCCESS"){
     
    console.log('reducer',payload);
    newState.rateUserDeatils = payload;

}
if(type === "CHECK_ITEM_IN_WISHLIST"){
    newState.item.checkItemIsInWishList = payload;
}
if(type === ACTIONS.USER_LOGIN_SUCCESS){
   

    newState.auth.userId = payload.id;
    newState.auth.email = payload.name;
    newState.auth.role = payload.role;
    newState.auth.isAuthenticated = true;
}
if(type === ACTIONS.USER_LOGIN_FAILED){
   

    newState.auth.userId = '';
    newState.auth.email = '';
    newState.auth.isAuthenticated = false;
}
if(type === "LOG_OUT"){
   
        
    localStorage.removeItem("jwtToken");

    newState.auth.userId = '';
    newState.auth.email = '';
    newState.auth.role = "guest";
    newState.auth.isAuthenticated = false;
}
if(type === "IS_TOKEN_CHECKED"){
   
    newState.auth.isTokenChecked = true;
}

    
     
    return newState;

}


export default reducer; 
