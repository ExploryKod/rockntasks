import { useEffect } from "react";
import { createContext, useState } from "react";

const addListItem = (listItems, taskToAdd) => {

    const existingListItem = listItems.find(
        (listItem) => listItem.id === taskToAdd.id);

    if (existingListItem) {
        return listItems.map((listItem) =>
            listItem.id === taskToAdd.id
                ? { ...listItem, quantity: listItem.quantity + 1 }
                : listItem);
    };

    return [...listItems, { ...taskToAdd, quantity: 1 }];
};

const removeListItem = (listItems, productToRemove) => {
    const existingListItem = listItems.find(
        (listItem) => listItem.id === productToRemove.id
    );

    if (existingListItem.quantity === 1) {
        // If the quantity of the existing cart item is 1, remove it from the cart
        return listItems.filter((listItem) => listItem.id !== productToRemove.id);
    } else {
        // Otherwise, decrement the quantity of the existing cart item by 1
        return listItems.map((listItem) =>
            listItem.id === productToRemove.id
                ? { ...listItem, quantity: listItem.quantity - 1 }
                : listItem
        );
    }
};

export const ListContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    listItems: [],
    addItemToList: () => { },
    removeItemFromList: () =>  { },
    cartCount: 0,
    total: 0
});

export const ListProvider = ({ children }) => {

    const [isListOpen, setIsListOpen] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [listCount, setListCount] = useState(0);
    const [listTotal, setListTotal] = useState(0);

    useEffect(() => {
        const newListCount = listItems.reduce(
            (total, listItem) => total + listItem.quantity, 0);

        setListCount(newListCount);
    }, [listItems]);

    useEffect(() => {
        const newListTotal = listItems.reduce(
            (total, listItem) => total + listItem.quantity * listItem.price, 0);

        setListTotal(newListTotal);
    }, [listItems]);
    
    const addItemToList = (taskToAdd) => {
        setListItems(addListItem(listItems, taskToAdd))
    }



    const removeItemFromList = (taskToRemove) => {
        setListItems(removeListItem(listItems, taskToRemove));
    };


    const value = {
        isListOpen,
        setIsListOpen,
        addItemToList,
        removeItemFromList,
        listItems,
        listCount,
        listTotal,
    };



    return (
        <ListContext.Provider value={value}>{children}</ListContext.Provider>
    )
}

