import React from 'react';
import { rootRef, objectsRef } from '../config/FirebaseConfig';
import {AsyncStorage} from 'react-native'

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
    linkAva : string,
    uid : string
};

class AppContainer extends Container < AppState > {
    constructor(props = {})
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
            uid : props.uid?props.uid:"",
            linkAva : props.linkAva?props.linkAva:""
        };
      
        this.getData_From_FireBase()

    }

    checkArr_Empty = (arr) => {
        if ( typeof arr == "undefined" || arr.length == 0) {
            return true
        }
        return false

    }
    
    setAppState = ( state ) => {
        let {
            isLoading ,
            arrType,
            arrMuseum,
            arrComt,
            arrFavorites,
            arrObject,
            arrObject_Show,
            arrFavorites_Show,
            uid
        } = state

        this.setState({
            isLoading : this.checkArr_Empty(isLoading)?this.state.isLoading:isLoading,
            arrType : this.checkArr_Empty(arrType)?this.state.arrType:arrType,
            arrMuseum : this.checkArr_Empty(arrMuseum)?this.state.arrMuseum:arrMuseum,
            arrComt : this.checkArr_Empty(arrComt)?this.state.arrComt:arrComt,
            arrFavorites : this.checkArr_Empty(arrFavorites)?this.state.arrFavorites:arrFavorites,
            arrObject : this.checkArr_Empty(arrObject)?this.state.arrObject:arrObject,
            arrObject_Show : this.checkArr_Empty(arrObject_Show)?this.state.arrObject_Show:arrObject_Show,
            arrFavorites_Show  : this.checkArr_Empty(arrFavorites_Show)?this.state.arrFavorites_Show:arrFavorites_Show,
            uid : this.checkArr_Empty(uid)?this.state.uid:uid,
        })
        return true

    }

    setState_Checked = (index,value) => {
        let { arrType } = this.state
        arrType[index].checked = value
        
        this.setState({
            arrType : arrType,
        })
        
        return true

    }

    setInfo_User =  async (uid, linkAva) => {
        try {
            await AsyncStorage.setItem("@Key:uid",uid)
            await AsyncStorage.setItem("@Key:linkava",linkAva)
        } catch (error) {
            console.log("Error Storage User",error)
            return false
        }

        this.setState({
            uid: uid,
            linkAva: linkAva
        },()=> console.log("Uid Updated", this.state))
        return true

    }

    filterList_Object = () => {
       let arrType = this.state.arrType.filter((item)=>{return (item.checked == true)}).map((item)=>{return(item.key)})
       console.log("Filter List", arrType)
       if(this.checkArr_Empty(arrType)) return false

       let arrObj = this.state.arrObject.filter((item)=>{
            return (arrType.indexOf(item.data.idType)!==-1)
       })
       console.log("Filter List", arrObj)

       this.setState({
           arrObject_Show : arrObj,
           arrType : this.state.arrType.map((item)=>{
               let type = item
               type.checked = false
               return type
           })
       },()=>console.log("Filter Obj",this.state.arrType))
       return true
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
            uid, 
            linkAva
        } = this.state

        return({
            arrType : arrType,
            arrMuseum : arrMuseum,
            arrComt : arrComt,
            arrFavorites : arrFavorites,
            arrObject : arrObject,
            arrObject_Show : arrObject_Show,
            arrFavorites_Show  : arrFavorites_Show,
            uid : uid,
            linkAva: linkAva
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
                                checked : false,
                                des : itm.toJSON()
                            })
                        })
                    }


                    if(item.key=="Profiles")
                    {
                        console.log("Profile", item.toJSON())
                    }
                })

                //  Loc mang Obj 
                let arrObj_FillName = arrObj.map((item)=>{
                    let obj = item
                    obj.data.nameType = arrType.find((types)=>{return (types.key == obj.data.idType)}).des
                    obj.data.nameMuseum = arrMus.find((museums)=>{return (museums.key == obj.data.idMuseum)}).des
                    return  obj
                })

                //console.log("Obj",arrObj_FillName)
                // console.log("Muse",arrMus)
                //console.log("Type",arrType)
                this.setState(
                    {
                        isLoading:false,
                        arrObject: arrObj_FillName,
                        arrObject_Show: arrObj_FillName,
                        arrType : arrType,
                        arrMuseum: arrMus
                    },()=>
                {
                    console.log("Updated",this.state)
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
        return true
    }

    


}

export default AppContainer