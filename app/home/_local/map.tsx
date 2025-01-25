import React from 'react';
import { MapPin, Building2 } from 'lucide-react';

const Map: React.FC = () => {
  return (
    <div className="flex flex-row gap-8 p-6">
      <div className="w-1/2 rounded-xl overflow-hidden shadow-xl border-4 border-[#42B5FC]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d484.2358158494795!2d100.57112953225806!3d13.845849271288772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dd1c50604bf%3A0x6fb49d7e99ace360!2z4Lit4Liy4LiE4Liy4Lij4Lin4Li04LiX4Lii4Liy4Lio4Liy4Liq4LiV4Lij4LmM4LiB4Liy4Lii4Lig4Liy4LieIDQ1IOC4m-C4tQ!5e0!3m2!1sth!2sth!4v1736056027312!5m2!1sth!2sth&disableDefaultUI=true&zoomControl=false&scrollwheel=false&draggable=false"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        />
      </div>

      <div className="w-1/2 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#42B5FC] mb-8 text-center">
          สถานที่สอบสัมภาษณ์
        </h1>
        
        <div className="space-y-6 w-full flex flex-col items-center">
          <div className="space-y-2 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 justify-center">
              <MapPin className="h-10 w-10 text-[#42B5FC]" />
              <span className="font-bold text-xl">
                SC45 ชั้น 8 ห้อง 833
              </span>
            </div>
            <div className="space-y-1">
              <p>มหาวิทยาลัยเกษตรศาสตร์</p>
              <p>คณะวิทยาศาสตร์ ภาควิชาวิทยาการคอมพิวเตอร์</p>
            </div>
          </div>

          <hr className="border-gray-200 w-full" />
          <div className="space-y-2 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 justify-center">
              <Building2 className="h-10 w-10 text-[#42B5FC]" />
              <span className="font-bold text-xl">
                50 ถนนงามวงศ์วาน
              </span>
            </div>
            <div>
              <p>แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
