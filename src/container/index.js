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
    arrProfile:object,
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
            arrProfile:[],
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
            arrProfile,
            linkAva,
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
            arrProfile  : this.checkArr_Empty(arrProfile)?this.state.arrProfile:arrProfile,
            linkAva : linkAva,
            uid : uid,
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
            console.log("Err Set Info User",error)
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

    searchObject = (text) => {
        let textSearch = this.formatingVietnamese(text).toLowerCase()
        if(!textSearch) return false
        
        let arrType = this.state.arrType.filter((item)=>{return (item.checked == true)}).map((item)=>{return(item.key)})
        console.log("Filter List", textSearch)
        let arrObj
        if(this.checkArr_Empty(arrType)) 
        {
            arrObj = this.state.arrObject
        }
        else
        {
            arrObj = this.state.arrObject.filter((item)=>{
                return (arrType.indexOf(item.data.idType)!==-1)
            })
        }
        

        let arrObject_Search= arrObj.filter((item)=> {
            let name =  this.formatingVietnamese(item.data.name).toLowerCase()
            let des =  this.formatingVietnamese(item.data.description).toLowerCase()
            console.log("Name", name)
            return (name.indexOf(textSearch)!==-1||des.indexOf(textSearch)!==-1)
        })
    
      this.setState({
          arrObject_Show : arrObject_Search,
          arrType : this.state.arrType.map((item)=>{
            let type = item
            type.checked = false
            return type
        })
      })
      return true
    }

    // Kiem tra Uid co trong arrProfile ko ?
    checkUid_Exists = (uid)  => {
        let arrProfile = this.state.arrProfile.map((item)=>{return item.data.uid})
        console.log("Check Uid", arrProfile)
        let check = arrProfile.findIndex((item)=> {return item == uid})
        if(check==-1) return false
        // Save info user
        this.setInfo_User(uid,this.state.arrProfile[check].data.urlAvatar)

        return this.state.arrProfile[check]
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
            arrProfile,
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
            arrProfile : arrProfile,
            uid : uid,
            linkAva: linkAva
        })
    }   

    getData_From_FireBase = () => {
        rootRef.on('value', (child) => {
                let arrObj = []
                let arrMus = []
                let arrType = []
                let arrProfile = []

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
                        item.forEach((itm)=>{
                            arrProfile.push({
                                key:itm.key,
                                data : itm.toJSON()
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

                //console.log("Obj",arrObj_FillName)
                // console.log("Muse",arrMus)
                console.log("Type",arrType)
                this.setState(
                    {
                        isLoading:false,
                        arrObject: arrObj_FillName,
                        arrObject_Show: arrObj_FillName,
                        arrProfile : arrProfile,
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

    formatingVietnamese = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Combining Diacritical Marks
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
    
        return str;
    }


}

export default AppContainer