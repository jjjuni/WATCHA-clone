import CardSkeleton from "./card-skeleton";

const CardSkeletonList = ({num}) => {
    return (
        new Array(num).fill(0).map((_, idx) => <CardSkeleton key={idx}/>)
    )
}

export default CardSkeletonList;