import { Component, OnInit } from '@angular/core';
declare const L: any;
@Component({
  selector: 'app-pontos-coleta',
  templateUrl: './pontos-coleta.component.html',
  styleUrls: ['./pontos-coleta.component.scss']
})
export class PontosColetaComponent implements OnInit {


  constructor() {


  }

  ngOnInit() {
    let posExtraMooca = [-23.55398, -46.60009];

    var greenIcon = L.icon({
      iconUrl: 'https://www.clipartmax.com/png/full/117-1179307_filemap-pin-icon-green-map-marker-png-green.png',


      iconSize: [50, 70], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    let mymap = L.map('map').setView(posExtraMooca, 19);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 19,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoicG9udG92aXJndWxhIiwiYSI6ImNrc3BjcG1ncjAxcnoyb2xubHdxbGo5NTkifQ.KvPOTWpiGnxrPK0tiDxYiA'
    }).addTo(mymap);

    let marker = L.marker(posExtraMooca, { icon: greenIcon }).addTo(mymap);
    marker.bindPopup('<b style="color: green; font-size:24px;"> Local: Extra Mooca </b>' +
      '</br> <b style="color: green;">Endereço:</b> Rua Taquari , 109 - Mooca </br> ' +
      '<b style="color: green; align: center;"> Tipo de coleta: </b> </br> • Cabos;</br> • Eletrodomésticos de pequeno porte;</br> • Pilhas usadas; </br> • Carregadores USB;').openPopup();
  };


  //pk.eyJ1IjoicG9udG92aXJndWxhIiwiYSI6ImNrc3BjMGNhbjAxaWIyb3FrY2pzZDliZTQifQ.8Cze7hyVc6i1_FM3R3wNtw

}
