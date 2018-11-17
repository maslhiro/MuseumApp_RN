import React, {Component} from 'react';

export class Object extends Component{
  constructor(idObject, idMuseum, name, type, description, linkImg, isActived){
    this.idObject = idObject;
    this.idMuseum = idMuseum;
    this.name = name;
    this.type = type;
    this.description = description;
    this.linkImg = linkImg;
    isActived = false;
  }
}

