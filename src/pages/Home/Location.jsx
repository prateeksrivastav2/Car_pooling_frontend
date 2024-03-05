import { Button, TextInput, Textarea } from "flowbite-react";
import { BiPaperPlane } from "react-icons/bi";
import Map from "./Map";
import { AiFillMail, AiFillPhone } from "react-icons/ai";

const Location = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div>
        <h3 className="text-2xl font-bold">Get in Touch</h3>
        <address className="my-5">
          <p className="flex items-center gap-1">
            <AiFillPhone className="text-purple-900" /> +918955367568
          </p>
          <p className="flex items-center gap-1">
            <AiFillMail className="text-purple-900" /> gargshashwat705@gmail.com
          </p>
        </address>
        <p className="mb-5">
          If you wantt to send any message like suggestions or complaints; just
          send message below. We will review your message shortly.
        </p>
        <div className="mt-5">
          <div className="mb-3">
            <TextInput type="text" placeholder="Your Name" />
          </div>
          <div className="mb-3">
            <TextInput type="email" placeholder="Your Email" />
          </div>
          <div className="mb-3">
            <Textarea rows="4" placeholder="Write your message..." />
          </div>
          <Button color="purple" className="rounded w-full font-bold">
            <BiPaperPlane />
            <span className="ml-1">Send Message</span>
          </Button>
        </div>
      </div>
      <div className="">
        <Map />
      </div>
    </div>
  );
};

export default Location;
