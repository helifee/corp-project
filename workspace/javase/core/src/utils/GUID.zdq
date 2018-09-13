package utils;
/**
 * <p>���������: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2006</p>
 * <p>Company: </p>
 * @author �����
 * @version 1.0
 */

import java.util.Arrays;
import java.util.zip.Adler32;

/**
 *  Represents a unique ID
 *
 */
public class GUID
{
  private short[] data;

  /**
   *  Construct a new GUID
   *
   */
  public GUID()
  {
     data = Utilities.generateGUID();
  }


  /**
   *  Create a guid from network data
   *
   *
   */
  public GUID(short[] data)
  {
    this.data = data;
  }

  /**
   *  Query the bytes in this GUID
   *
   *  @return bytes
   */
  short[] getData()
  {
    return data;
  }

  /**
   *  Compare guids
   *
   */
  public boolean equals(Object obj)
  {
    if ( !(obj instanceof GUID) )
    {
      return false;
    }

    // Check if the data is the same
    GUID rhs = (GUID)obj;
    short[] lhsData = getData();
    short[] rhsData = rhs.getData();

    return Arrays.equals(lhsData, rhsData);
  }

  /**
   *  Produce a hashcode for this GUID
   *
   */
  public int hashCode()
  {
    Adler32 adler32 = new Adler32();

    // todo fix this stuff
    byte[] tempData = new byte[data.length];

    for (int i = 0; i < data.length; i++)
    {
      tempData[i] = (byte)data[i];
    }

    adler32.update(tempData);

    return (int)adler32.getValue();
  }

  /**
   *  Returns a GUID as a String
   *
   *  @return text form of guid
   */
  public String toString()
  {
    StringBuffer message = new StringBuffer();
//    message.append("GUID: ");

    for (int i = 0; i < data.length; i++)
    {
      message.append(Integer.toHexString( data[i]));
    }
    String r = message.toString();
    return r;
  }

  public static void main(String args[]){
    for(int i = 0; i < 1000000; i++){
      GUID g = new GUID();
      System.out.println(g.toString());
    }
  }
}
