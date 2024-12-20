import Card from "./Card";
export default function TopDestinations() {
  return (
    <div className="md:h-[36.5rem] h-fit w-full mt-[5rem]">
      <div className="flex items-center justify-center gap-5">
        <img
          src="/aeroplane.png"
          loading="lazy"
          alt=""
          className="lg:w-24 lg:h-24 md:h-20 md:w-20 h-16 w-16"
        />
        <h1 className="md:text-4xl text-2xl  font-bold">
          Explore Our Top Destinations
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-center lg:gap-10 md:gap-6 gap-10  mt-10 ">
        <Card
          _id="673111df060482f9314dc420"
          src="Tajmahal.jpeg"
          Days="4"
          peoples="25"
          City="Agra"
          Country="India"
          price="7790"
        />
        <Card
          _id="673113bd060482f9314dc667"
          src="Hawamahal.jpeg"
          City="Jaipur"
          Country="India"
          Days="5"
          peoples="10"
          price="9790"
        />
        <Card
          _id="670bd7499e44502c01d4ed29"
          src="https://media.easemytrip.com/media/Blog/India/637796764366393506/6377967643663935062h8Tc5.jpg"
          City="GOA"
          Country="India"
          Days="3"
          peoples="18"
          price="9999"
        />

      </div>
    </div>
  );
}
