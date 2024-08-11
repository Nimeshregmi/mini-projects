'use client'
import { useEffect, useState } from "react";
const RADIUS = 50;

interface Props {
    x: number;
    y: number;
    intersection: number;
    color: string;
}
type Coordinate = {
    x: number;
    y: number;
};
const Circle = ({ x, y, intersection, color }: Props) => {
    return <div
        style={{
            position: 'absolute',
            left: x - RADIUS,
            top: y - RADIUS,
            width: `${RADIUS * 2}px`,
            height: `${RADIUS * 2}px`,
            borderRadius: '50%',
            backgroundColor: color || 'red',
            border: '1px solid black',

        }}
    >
        {intersection}
    </div>
}


const OvelappingCircle = () => {
    const [circlecoordinate, setcirclecoordinate] = useState<Coordinate[]>([]);
    const drawCircle = (e: any) => {
        const x=e.clientX;
        const y=e.clientY;
        console.log(x,y);
        setcirclecoordinate(prev => [...prev, { x, y }]);
    }
    useEffect(() => {
        document.addEventListener('click', drawCircle);
        return () => document.removeEventListener('click', drawCircle);
    }, []);
    const colors = ["khaki", "lightblue", "lightgreen", "lightpink"];
    const findNumberOfIntersections = (circleCoordsList: any, x1: any, y1: any) => {
        let noOfIntersect = 0;
        circleCoordsList.forEach((circle: { x: any; y: any; }) => {
            const x2 = circle.x;
            const y2 = circle.y;

            const distanceBetweenTwoPoints = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
            if (x1 !== x2 || y1 !== y2) {
                if (distanceBetweenTwoPoints < 2 * RADIUS) noOfIntersect++;
            }
        });
        return noOfIntersect;
    };
  return (
    <div className="App">
        <h1>Overlapping Circle</h1>
        {circlecoordinate.map((coord, idx) => {
                    const intersections = findNumberOfIntersections(circlecoordinate, coord.x, coord.y);

                    return (
                        <Circle
                            key={idx}
                            x={coord.x}
                            y={coord.y}
                            color={colors[intersections]}
                            intersection={intersections}
                        />);
                })}

    </div>
  )
}

export default OvelappingCircle







































// const OvelappingCircle = () => {
    
    
   

//   return (
//     <div className='App'>
//         <h1>Overlapping Circles</h1>
        
//     </div>
//   )
// }

// export default OvelappingCircle