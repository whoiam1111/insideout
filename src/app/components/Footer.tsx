export default function Footer() {
    return (
        <footer className="bg-white border-t mt-12">
            <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} InsideOut | Munto Clone
            </div>
        </footer>
    );
}
