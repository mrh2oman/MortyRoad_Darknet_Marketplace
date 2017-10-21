# MortyRoad_Darknet_Marketplace
 Inspired by the online darknet market Silk Road, comes MortyRoad. MortyRoad is an online darnet market for all things illicit in the "Rick and Morty" universe.  Using NodeJS and MySql I created an application for customers and managers to purchase and sell illegal items from all over the galaxy. 

 #Features

 Uses a NodeJS interface

 Customers can -
    Purchase products from the MortyRoad inventory

 1. Managers can - 
    *View all the products for sale
    *View what items have a low inventory
![Alt text](/images/ViewInvLowInv.png "View Products and View Items with Low Inventory")

    Add to existing inventory levels
    Create a new product with an inventory level

#Setup

    Clone this repo to your desktop and run NPM install to install all the dependencies

    Initialize the mortyroadDB.sql file in MySql Workbench


    Run node mortyroadCustomer.js 
                OR
    Run node mortyroadManager.js

#Usage

    After you have cloned this repo to your desktop, initialized the mortyroadDB.sql and ran npm install you can start the program by traveling to the root directory running either of the following commands - 

    node mortyroadCustomer.js 
                OR
    node mortyroadManager.js


