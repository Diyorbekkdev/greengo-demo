import { hoc } from "@/utils";
import { useBikeCommandsProps } from "./bike-commands.props";

export const BikeCommands = hoc(useBikeCommandsProps, ({data})=> {
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique modi temporibus consequatur vitae quasi fugiat mollitia veritatis doloribus animi, corrupti est alias tempore enim in iure cumque perspiciatis voluptate! Et maiores sequi modi non, nihil natus labore quod dolorem totam omnis commodi in beatae vel recusandae maxime, sapiente dignissimos laboriosam, ducimus nisi culpa optio obcaecati est magni fuga! Minima ea, placeat, veritatis officia quibusdam repudiandae quaerat cum fugit perferendis dolores sapiente, id tempore amet. Corporis voluptatibus quidem deleniti, voluptates recusandae vero perferendis necessitatibus iure, officia aperiam, quis natus similique. Atque perferendis quibusdam nostrum vel quis dolor suscipit provident officiis temporibus. {data}
        </div>
    )
})