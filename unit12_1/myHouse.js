const theGarage = new Garage(1);
const theLot = new Garage(5);

const theFox = new Car("Subaru", "GL", "1989");
const Jasmine = new Car("Subaru", "Outback", "1998");
const theRaccoon = new Car("Subaru", "GL", "1988");
const galihad = new Car("Subaru", "Outback", "1997");

theGarage.add(galihad);
theLot.add(theFox);
theLot.add(Jasmine);
theLot.add(theRaccoon);

console.log(theGarage);
console.log(theLot);
