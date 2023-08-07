const ButtonGroup = ({ btnName, disable, handleClick, icon }: any) => {
  return (
    <button
      onClick={() => handleClick()}
      className="shadow-lg hover:scale-110 ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] p-2 flex justify-center space-x-2 items-center text-center text-white rounded-xl"
    >
      {icon} <span className="ml-2">{btnName}</span>
    </button>
  );
};

export default ButtonGroup;
