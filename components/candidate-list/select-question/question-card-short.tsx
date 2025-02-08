export default function QuestionCardShort (){
  return (
    <section className="bg-white p-3 shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <p className="text-primary-600">ประเภทคำถาม</p>
          <button className="text-green-500 border-green-500 border-1 py-1 px-3 rounded-lg" >ง่าย</button>
        </div>
        <div className="flex gap-4">
          <button className="text-primary-400">แก้ไข</button>
          <button className="text-red-500">ลบ</button>
        </div>
      </div>
      <div className="mt-3 text-[#3B434F]">
        Borem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </section>
  );
}
