import Link from "next/link";

interface Step {
  name: string;
  link: string;
  isValid: boolean;
}

interface CheckoutStepsProps {
  activeStep: number;
}

const CheckoutSteps = ({ activeStep }: CheckoutStepsProps) => {
  const steps: Step[] = [
    { name: 'Cart', link: '/cart', isValid: true },
    { name: 'Checkout', link: '/checkout', isValid: activeStep >= 1 },
    { name: 'Payment', link: '/payment', isValid: activeStep >= 2 },
    { name: 'Place Order', link: '/placeorder', isValid: activeStep >= 3 }
  ];

  return (
    <div className="flex justify-center items-center my-6 space-x-2">
      {steps.map((step, index) => (
        <div key={step.name} className="flex items-center">
          {index !== 0 && (
            <div className={`h-0.5 w-12 bg-${step.isValid ? "black" : "gray-200"}`} />
          )}
          <Link
            href={step.isValid ? step.link : '/#'}
            className={`ml-2 ${step.isValid ? "text-black font-semibold" : "text-gray-400 font-normal"} 
            ${activeStep === index ? "border-black border-b-2" : ""}`}
          >
            {step.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
