import Spinner from "../components/Spinner";

const FallbackLoading = () => {
  return (
    <div className="fixed z-[9999999] flex h-[100dvh] w-full items-center justify-center bg-white/30 backdrop-blur-sm">
      <Spinner size={"sm"} className="border-gray-600" />
    </div>
  );
};

export default FallbackLoading;
