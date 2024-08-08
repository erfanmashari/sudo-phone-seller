type PopUpProps = {
  setPopUpDisplay: any;
  deleteFunction: () => void;
};

const PopUp = ({ setPopUpDisplay, deleteFunction }: PopUpProps) => {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-gray-600/40">
        <div className="w-3/12 flex flex-col bg-white rounded-xl gap-6 p-4">
          <label className="text-lg font-bold text-rose-700">
            آیا مایل به حذف هستید؟
          </label>
          <div className="w-full flex flex-row justify-center items-center gap-6">
            <button
              type="button"
              onClick={deleteFunction}
              className="w-6/12 bg-red-600 text-white font-bold py-1.5 rounded-lg"
            >
              حذف
            </button>
            <button
              type="button"
              className="w-6/12 bg-blue-600 text-white font-bold py-1.5 rounded-lg"
              onClick={() => setPopUpDisplay(false)}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
