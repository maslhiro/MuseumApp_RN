import React from 'react';
import { rootRef, objectsRef } from '../config/FirebaseConfig';

import {
    Container
} from 'unstated';

type AppState = {
    arrType : object,
    arrMuseum : object,
    arrComt : object,
    arrFavorites : object,
    arrObject : object,
    arrObject_Show : object,
    arrFavorites_Show  : object,
    uid : "Vinh"
};

class AppContainer extends Container < AppState > {
    constructor(props)
    {
        super(props)
        this.state = {
            isLoading : true,
            arrType : [],
            arrMuseum : [],
            arrComt : [],
            arrFavorites : [],
            arrObject : [],
            arrObject_Show : [],
            arrFavorites_Show  : [],
            uid : "Vinh"
        };

        this.getData_From_FireBase()
    }
    

    getAppState = () => {
        let {
            arrType,
            arrMuseum,
            arrComt,
            arrFavorites,
            arrObject,
            arrObject_Show,
            arrFavorites_Show,
            uid
        } = this.state

        return({
            arrType : arrType,
            arrMuseum : arrMuseum,
            arrComt : arrComt,
            arrFavorites : arrFavorites,
            arrObject : arrObject,
            arrObject_Show : arrObject_Show,
            arrFavorites_Show  : arrFavorites_Show,
            uid : uid
        })
    }   

    getData_From_FireBase = () => {
        rootRef.on('value', (child) => {
                let arrObj = []
                let arrMus = []
                let arrType = []

                child.forEach((item)=>{
                    console.log("Updated", item.key)
                    if(item.key=="Objects")
                    {
                        item.forEach((itm)=>{
                            arrObj.push({
                                key:itm.key,
                                data : itm.toJSON()
                            })
                        })
                    }

                    if(item.key=="Museums")
                    {
                        item.forEach((itm)=>{
                            arrMus.push({
                                key: itm.key,
                                des : itm.toJSON()
                            })
                        })
                    }

                    if(item.key=="Types")
                    {
                        item.forEach((itm)=>{
                            arrType.push({
                                key: itm.key,
                                des : itm.toJSON()
                            })
                        })
                    }
                })

                //  Loc mang Obj 
                let arrObj_FillName = arrObj.map((item)=>{
                    let obj = item
                    obj.data.nameType = arrType.find((types)=>{return (types.key == obj.data.idType)}).des
                    obj.data.nameMuseum = arrMus.find((museums)=>{return (museums.key == obj.data.idMuseum)}).des
                    return  obj
                })

                console.log("Obj",arrObj_FillName)
                console.log("Muse",arrMus)
                console.log("Type",arrType)
                this.setState(
                    {
                        isLoading:false,
                        arrFavorites_Show:arrObj_FillName,
                        arrObject: arrObj_FillName,
                        arrType : arrType,
                        arrMuseum: arrMus
                    },()=>
                {
                    console.log("Updated")
                }
                )
              
            })
          
          



    }

    randomList_Obj = () => 
    {
        let arrObject_Show = this.state.arrObject.sort(() => { return (0.5 - Math.random()) });
        this.setState(
            {
                arrObject_Show: arrObject_Show
            },
            () => 
            {
                console.log("Random data sucessful :)))")
            }   
        )
    }

    


}

export default AppContainer