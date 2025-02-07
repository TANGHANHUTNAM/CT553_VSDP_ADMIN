interface IBuilderCanvasProps {}

const BuilderCanvas: React.FC<IBuilderCanvasProps> = ({}) => {
  return (
    <div>
      <div className="h-[135px] w-full rounded-md bg-[url('./assets/1200x300.png')] bg-cover bg-center bg-no-repeat" />
    </div>
  );
};

export default BuilderCanvas;
