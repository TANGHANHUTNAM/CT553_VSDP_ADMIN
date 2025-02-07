import { IoMdSearch } from "react-icons/io";
import InputSearchComponent from "../../components/InputSearchComponent";
import { useState } from "react";

interface IFormComponentsProps {}

const FormComponents: React.FC<IFormComponentsProps> = ({}) => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="mt-3">
      <InputSearchComponent
        onSearch={(value) => setSearch(value)}
        size="small"
        allowClear
        placeholder="Tìm kiếm..."
        className="w-full"
        enterButton={<IoMdSearch className="text-xl" />}
      />
      <div className="mt-2 h-[calc(100vh-200px)] w-full overflow-y-auto p-1.5 scrollbar-thin">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, cum
        architecto provident repudiandae inventore totam nihil optio quidem, rem
        enim nam beatae hic voluptates delectus laudantium ullam, ducimus
        perspiciatis nisi! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Natus, cum architecto provident repudiandae inventore totam nihil
        optio quidem, rem enim nam beatae hic voluptates delectus laudantium
        ullam, ducimus perspiciatis nisi! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Natus, cum architecto provident repudiandae inventore
        totam nihil optio quidem, rem enim nam beatae hic voluptates delectus
        laudantium ullam, ducimus perspiciatis nisi! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Natus, cum architecto provident
        repudiandae inventore totam nihil optio quidem, rem enim nam beatae hic
        voluptates delectus laudantium ullam, ducimus perspiciatis nisi! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Natus, cum architecto
        provident repudiandae inventore totam nihil optio quidem, rem enim nam
        beatae hic voluptates delectus laudantium ullam, ducimus perspiciatis
        nisi!
      </div>
    </div>
  );
};

export default FormComponents;
