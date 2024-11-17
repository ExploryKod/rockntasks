
export const Loader = () => {
    return <img className="loader-image" src={import.meta.env.VITE_SITE_FRONT+'/loaders/loader_circles.svg'} alt="loader" />;
}