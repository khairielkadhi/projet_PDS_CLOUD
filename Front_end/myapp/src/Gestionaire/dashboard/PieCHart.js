import React from "react";
import { VictoryPie,VictoryStack } from "victory-pie";

const myData = [
  { x: "A", y: 900, label: "Group A" },
  { x: "B", y: 400, label: "Group B" },
  { x: "C", y: 300, label: "Group C" },
];

const data2012 = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  
  const data2013 = [
    {quarter: 1, earnings: 15000},
    {quarter: 2, earnings: 12500},
    {quarter: 3, earnings: 19500},
    {quarter: 4, earnings: 13000}
  ];
  
  const data2014 = [
    {quarter: 1, earnings: 11500},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 20000},
    {quarter: 4, earnings: 15500}
  ];
  
  const data2015 = [
    {quarter: 1, earnings: 18000},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 15000},
    {quarter: 4, earnings: 12000}
  ];
  
  

const colorPalette = ["#191970", "#800000", "#4b0082"]; // Couleurs en hexadécimal

const ChartsPage = () => {
    
  return (
    <div>
        
      <VictoryPie
        data={myData}
        colorScale={colorPalette} // Utiliser le tableau de couleurs en hexadécimal
        radius={0} // Ajuster le rayon du graphique selon vos besoins
        innerRadius={200} // Définir un rayon intérieur (pour un graphique en forme d'anneau)
        labels={({ datum }) => `${datum.label}: ${datum.y}`}
        style={{ labels: { fontSize: 20 ,fill: "white" } }} 
      
      />
      
    
    

    </div>
  );
};

export default ChartsPage;
