class Vehicle {
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk(){
        return "Beep.";
    }
    toString(){
        return `The vehicle is a ${make} ${model} from ${year}`;
    }
}
class Car extends Vehicle{
    constructor(make,model,year){
        super(make, model, year);
        this.numWheels = 4;
    }
}