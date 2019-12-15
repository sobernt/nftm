var nft;
var lastsize=0;
var Storage=require("Storage");
PrimaryI2C.setup({sda: SDA, scl: SCL});
var lcd = require("HD44780").connectI2C(PrimaryI2C, 0x27);

/**
---------------------------------------------
read_nft - function for read nft from Storage
---------------------------------------------
*/
function read_nft(){
  nft = Storage.readJSON("nft");
}
/**
---------------------------------------------
reset_nft - function for reset nft
---------------------------------------------
*/
function reset_nft(){
nft={
  y:0,
  d:0,
  h:0,
  m:0,
  s:0
};
  Storage.write("nft",JSON.stringify(nft));
}
/**
---------------------------------------------
get_nft_string - get nft as string
---------------------------------------------
*/
function get_nft_string(){
  return nft.y+"y"+
    nft.d+"d"+
    nft.h+"h"+
    nft.m+"m"+
    nft.s+"s";
}



read_nft();
if(nft==undefined){
  reset_nft();
}
setInterval(function() {
  if (digitalRead(BTN1) == 1) reset_nft();
 nft.s++;
  if(nft.s>59){
    nft.m++;
    nft.s=0;
  }
  if(nft.m>59){
    nft.h++;
    nft.m=0;
  }
  if(nft.h>23){
    nft.d++;
    nft.h=0;
  }
    if(nft.d>364){
    nft.y++;
    nft.d=0;
  }
  var nfts=get_nft_string();
  if(lastsize!=nfts.length){
    lcd.clear();
  }
  lastsize=nfts.length;
  console.log(nfts);
  lcd.setCursor(0, 0);
  if(lastsize>16){
    lcd.print("shitload");
  } else{
    lcd.print(nfts);
  }
  Storage.write("nft",JSON.stringify(nft));
}, 1000);
