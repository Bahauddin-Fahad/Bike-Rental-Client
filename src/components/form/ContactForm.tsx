const Form = () => {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="form-control w-full">
          <input
            className="input input-bordered border-[#27ae60] font-satoshi"
            type="text"
            placeholder="Name"
            name="name"
          />
        </div>
        <div className="form-control w-full">
          <input
            className="input input-bordered border-[#27ae60] font-satoshi"
            type="text"
            placeholder="Email Address"
            name="mail"
          />
        </div>
        <div className="form-control w-full">
          <input
            className="input input-bordered border-[#27ae60] font-satoshi"
            type="text"
            placeholder="Subject"
            name="subject"
          />
        </div>
        <div className="form-control w-full">
          <textarea
            className="input input-bordered border-[#27ae60] h-20 xl:h-24 pt-2 font-satoshi"
            placeholder="Your Message"
            name="message"
          />
        </div>
      </div>
      <div className="form-control mt-2 relative">
        <button
          className="flex justify-center items-center gap-1 xl:gap-[10px] bg-accent h-[40px] text-white text-xs xs:text-[16px] rounded-md font-vietnam-bold"
          type="submit"
          value="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
