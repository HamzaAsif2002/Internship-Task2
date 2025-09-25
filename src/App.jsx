import { faker } from "@faker-js/faker";
import { Charts } from "./components/chart/Charts";

const App = () => {
  const users = Array.from({ length: 12 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    country: faker.location.country(),
    gender: faker.person.sexType(),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        👤 User Directory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-600 text-sm mb-1">📧 {user.email}</p>
            <p className="text-gray-600 text-sm mb-1">🌍 {user.country}</p>
            <p className="text-gray-600 text-sm mb-1">⚧ {user.gender}</p>
          </div>
        ))}
      </div>
      <Charts />
    </div>
  );
};

export default App;
