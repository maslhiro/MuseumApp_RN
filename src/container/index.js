import React from 'react';
import { rootRef, objectsRef } from '../config/FirebaseConfig';
import {AsyncStorage} from 'react-native'
const defaultUri ="https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png"

const defaultObj = {
    data : {
        description: " ",
        idMuseum: "",
        idObject: "",
        idType: "",
        isActivated: "false",
        linkImg:defaultUri,
        name: "",
        nameMuseum: "",
        nameType: "",
    },  
    isFavorites: "false",
    key: "",
}

const defaultObj_01 = {
    data : {
        description: "Thẻ thu tô loại 1 đấu, 10 đấu, 100 đấu và thẻ đếm bao lúa xuất nhập kho",
        idMuseum: "M001",
        idObject: "-LTaCm5-yAfUYX9Pfg16",
        idType: "T008",
        isActivated: true,
        linkImg:"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0001%20(Copy).JPG?alt=media&token=49111e1a-fee6-49d3-9b92-eb7f70273dcd",
        name: "Thẻ thu tô",
        nameMuseum: "",
        nameType: "",
    },  
    isFavorites: "false",
    key: "-LTaCm5-yAfUYX9Pfg16",
}
import {
    Container
} from 'unstated';

type AppState = {
    arrType : object,
    currentObj : object,
    arrMuseum : object,
    arrComt : object,
    arrFavorites : object,
    arrObject : object,
    arrObject_Show : object,
    arrFavorites_User  : object,
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
            currentObj : defaultObj_01,
            arrComt : [],
            arrFavorites : [],
            arrObject : [],
            arrObject_Show : [],
            arrProfile:[],
            arrFavorites_User  : [],
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
            arrFavorites_User,
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
            arrFavorites_User  : this.checkArr_Empty(arrFavorites_User)?this.state.arrFavorites_User:arrFavorites_User,
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
        let AppState = {
            uid: uid,
            linkAva: linkAva,
        }

        this.setState(AppState,()=> 
        {
            this.getData_From_FireBase()
            console.log("Uid Updated", this.state)
        })
        
        return true

    }

    getInfo_User = () => {
        if(!this.state.uid) return {
            name :"",
            linkAva : defaultUri
        }
        let arrProfile = this.state.arrProfile
        let check = arrProfile.find((item)=> {return item.key == this.state.uid})
        if(check==-1) return {
            name : "",
            linkAva : defaultUri
        }
        return {
            name : check.data.name,
            linkAva : check.data.linkAva
        }
    }

    clearInfo_User = async () => {
        try {
            await AsyncStorage.clear()
            // await AsyncStorage.("@Key:uid"," ")  
            // await AsyncStorage.setItem("@Key:linkava"," ")
        } catch (error) {
            console.log("Err Clear Info User",error)
            return false
        }
        this.setState({
            uid: "",
            linkAva: "",
            arrFavorites_User:[]
        },()=> console.log("Clear User", this.state))
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

    setCurrent_Obj = (currentObj) => {
        this.setState({
            currentObj: currentObj
        }, () => console.log("Updated Current Obj",this.state))
        return true
    }

    // Kiem tra Uid co trong arrProfile ko ?
    checkUid_Exists = (uid)  => {
        let arrProfile = this.state.arrProfile
        console.log("Check Uid", arrProfile)
        let check = arrProfile.findIndex((item)=> {return item.key == uid})
        if(check==-1) return false
        // Save info user
        this.setInfo_User(uid,this.state.arrProfile[check].data.urlAvatar)

        return arrProfile[check]
    }

    getAppState = () => {
        let {
            arrType,
            arrMuseum,
            arrComt,
            arrFavorites,
            arrObject,
            arrObject_Show,
            currentObj,
            arrFavorites_User,
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
            currentObj:currentObj,
            arrObject_Show : arrObject_Show,
            arrFavorites_User  : arrFavorites_User,
            arrProfile : arrProfile,
            uid : uid,
            linkAva: linkAva?linkAva:defaultUri
        })
    } 
    
    getData_From_FireBase = () => {
        rootRef.on('value', (child) => {
                let arrObj = []
                let arrMus = []
                let arrType = []
                let arrProfile = []
                let arrFavorites = []
                let arrComment = []
                child.forEach((item)=>{
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
                    
                    if(item.key=="Favorite")
                    {
                        item.forEach((itm)=>{
                            arrFavorites.push({
                                key:itm.key,
                                data : itm.toJSON()
                            })
                        })
                    }

                    if(item.key=="Comments")
                    {
                        item.forEach((itm)=>{
                            arrComment.push({
                                key: itm.key,
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
                }).filter((item)=>{return(JSON.parse(item.data.isActivated))})

                arrComment = arrComment.map((item)=>{
                    let obj = item
                    let profile = arrProfile.find((itm)=>{return itm.data.uid == item.data.idUser})
                    if(profile!=-1)
                    {
                        console.log(profile)
                        obj.data.nameUser = profile.data.name,
                        obj.data.linkAva = profile.data.urlAvatar
                    }
                    return obj

                })
                // console.log("Obj",arrObj_FillName)
                // console.log("Muse",arrMus)
                console.log("Type",arrType)
                console.log("Favo",arrFavorites)
                console.log("Comt",arrComment)

                let AppState = {
                    isLoading:false,
                    arrObject: arrObj_FillName,
                    arrObject_Show: arrObj_FillName,
                    arrFavorites : arrFavorites,
                    arrProfile : arrProfile,
                    arrComt:arrComment,
                    arrType : arrType,
                    arrMuseum: arrMus
                }
                if(this.state.uid)
                {
                
                    let arrFavorites_Uid = arrFavorites.filter((item)=>{return(item.data.uid==this.state.uid)})
                    console.log("Favo Uid", arrFavorites_Uid)
                    let arrFavo_Uid = arrFavorites_Uid.map((item)=>{return(item.data.idObject)})
                    
                    AppState.arrObject =  arrObj_FillName.map((item)=>{
                        let  obj =  item
                        if(arrFavo_Uid.findIndex((itm)=>{ return itm == obj.data.idObject})!=-1)
                        {
                            console.log("OK",obj)
                            obj.isFavorites = true
                        }
                        else  obj.isFavorites = false
                        return obj
            
                    })
                    AppState.arrObject_Show =  AppState.arrObject
                    AppState.arrFavorites_User = AppState.arrObject.filter((item)=>{return(item.isFavorites)})
                 
            
                }

                if(this.state.currentObj.key)
                {
                    let currentObj =  AppState.arrObject.find((item)=>{return(item.key==this.state.currentObj.key)})
                    AppState.currentObj = currentObj
                }

                this.setState(AppState,()=>
                {
                    console.log("Updated",this.state)
                }
                )
              
            })

    }

    findComt_ByIdObj = (id) => {
        return (
            this.state.arrComt.filter((item)=>{
                return (item.data.idObject == id)
            })
        )
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