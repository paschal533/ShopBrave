const CreatedSuccess = ({ title, text }: any) => {
  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden bg-[#0F282F] justify-start  h-[100vh] p-12 `}
    >
      <section className="justify-center w-full space-y-4 flex-col text-center items-center align-middle">
        <h1 className="text-4xl text-white font-bold">{title}</h1>
        <p className="text-white text-xl">{text}</p>
        <p className="text-[#c5b0b0] text-xl">
          Read our Terms of Service and Privacy Policy
        </p>
      </section>
      <div className="absolute w-48 h-48  rounded-full -top-9 -left-16 -z-5  bg-[#B8D8E0]" />
      <div className="absolute w-72 h-72  rounded-full -bottom-24 -right-14 -z-5 bg-[#B8D8E0]" />
      <div className="absolute w-20 h-20  rounded-full top-20 left-40 -z-5  bg-[#B8D8E0]" />
      <div className="absolute w-20 h-20  rounded-full bottom-28 right-56 -z-5 bg-[#B8D8E0]" />
    </div>
  );
};

export default CreatedSuccess;
