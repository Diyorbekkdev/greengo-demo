import { ThreeDots } from "react-loader-spinner";
export const PageLoader = () => {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <ThreeDots
                height="700"
                width="100"
                radius="0"
                color="#1677ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    );
};
