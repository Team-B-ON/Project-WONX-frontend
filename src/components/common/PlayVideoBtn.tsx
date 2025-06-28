import playIcon from '@/assets/common/buttons/play.svg';

const PlayVideoBtn = () => {
    return (
        <div className="w-[116.02px] h-[43.19px] rounded-[4px] 
                        bg-white text-black hover:bg-[rgb(230,230,230)]
                        flex items-center justify-center flex-row gap-[10px]
                        font-medium text-[19.2px] cursor-pointer">
            <img src={playIcon} className="w-[29px] h-[29px]" alt="재생 버튼"/>
            재생
        </div>
    );
}

export default PlayVideoBtn;