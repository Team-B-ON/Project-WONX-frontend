type StarIconProps = {
  fill?: string;
  size?: number;
};

const StarIcon = ({ fill = "white", size = 25 }: StarIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25" fill={fill}>
    <path d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z" />
  </svg>
);

export default StarIcon;
