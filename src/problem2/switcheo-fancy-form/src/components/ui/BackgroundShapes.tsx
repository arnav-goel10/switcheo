const BackgroundShapes = () => {
  return (
    <>
      <div
        className="
            absolute -top-40 -left-40 w-[500px] h-[500px]
            bg-pink-500 rounded-full blur-3xl opacity-30
          "
      />
      <div
        className="
            absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px]
            bg-purple-500 rounded-full blur-3xl opacity-30
          "
      />
    </>
  );
};

export default BackgroundShapes;
