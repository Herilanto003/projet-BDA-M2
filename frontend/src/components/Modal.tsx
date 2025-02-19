export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full fixed bg-gray-800 bg-opacity-65 pt-20 top-0 left-0 z-20 overflow-auto">
      {children}
    </div>
  );
}
