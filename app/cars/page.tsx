// app/cars/page.tsx

type Car = {
    id: number;
    name: string;
    manufacturer: string;
    year: number;
    price: number;
  };
  
  const cars: Car[] = [
    { id: 1, name: 'Civic', manufacturer: 'Honda', year: 2020, price: 25000 },
    { id: 2, name: 'Camry', manufacturer: 'Toyota', year: 2021, price: 27000 },
    { id: 3, name: 'Model 3', manufacturer: 'Tesla', year: 2022, price: 40000 },
  ];
  
  export default function CarListPage() {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Danh sách xe hơi</h1>
        <table className="w-full table-auto border border-collapse border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên xe</th>
              <th className="border px-4 py-2">Hãng sản xuất</th>
              <th className="border px-4 py-2">Năm</th>
              <th className="border px-4 py-2">Giá ($)</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="border px-4 py-2">{car.id}</td>
                <td className="border px-4 py-2">{car.name}</td>
                <td className="border px-4 py-2">{car.manufacturer}</td>
                <td className="border px-4 py-2">{car.year}</td>
                <td className="border px-4 py-2">{car.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }