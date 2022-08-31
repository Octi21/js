function randInt(a,b){
	return Math.trunc(a+(b-a)*Math.random());//Math.random() e intre 0 si 1
}



class Culoare{
  
	constructor(_r = 0,_g = 0,_b = 0){// TO DO definiti trei parametri _r, _g, _b cu valori implicite 0
		this.r = _r;
		this.g = _g;
        this.b = _b;
  }
  
/*

*/
	generateRandom(){
	  this.r=randInt(0,255)
    this.g=randInt(0,255)
    this.b=randInt(0,255)
	}
	toString(){
		return "rgb("+this.r+","+this.g+","+this.b+")";
	}
	invert(){
		return new Culoare(255 - this.r, 255 - this.g, 255 - this.b);//TO DO calculati culoarea complementara
	}
};
/*

*/
function ransom(sir)
{
	//TO DO setati culoarea de background a body-ului la gri
	var scrisorica=document.getElementById("scrisorica");//selectati elementul cu id-ul "scrisorica"
	scrisorica.style.backgroundImage=
'url("http://irinaciocan.ro/imagini/hartie_veche.png")' ; //setati imaginea de background ceruta in enunt 
	for (let i=0;i<sir.length;i++) //TO DO parcurgere sir 
		{

			//var patt1=/\s/g;
            var patt1 = " ";

			if(!sir[i].match(patt1))
			{
				lit=document.createElement("span");
				
				lit.innerHTML=sir[i]; //litera de pe pozitia i din sir <span>A</span> 
                

                scrisorica.appendChild(lit);

				c=new Culoare();
				c.generateRandom();
				lit.style.color=c.toString();
				lit.style.background=c.invert().toString();//"rgb(....)"
				lit.style.fontSize=randInt(20,31)+"px"; //font-size:20px
				nr=randInt(0,2);
				lit.style.fontWeight=(nr%2==0?"bold":"normal")
				nr=randInt(0,2);
				lit.style.fontStyle=(nr%2==0?"italic":"normal") // TO DO - setare random  daca sa fie font italic sau nu (ca si la bold)
				fonturi=["Times New Roman","Comic Sans MS","Impact","Arial Black","Courier New","Lucida Console","Trebuchet MS"];
				lit.style.fontFamily=fonturi[randInt(0,fonturi.length )] //TO DO element aleator din fonturi
				lit.onclick= function(){
					// TO DO afisati in consola culoarea elementului (atat de text cat si de background)
                    console.log("litera:\n")
                    console.log(this.style.color);
                    console.log("fundal:\n")
                    console.log(this.style.background);
				}
			}
			else
			{
				scrisorica.appendChild(document.createTextNode(" ")); // pentru spatii nu mai facem span
			}
		}
}